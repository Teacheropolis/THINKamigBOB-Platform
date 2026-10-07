const RECONNECT_REASONS = new Set(["invalid_grant", "authorization-revoked", "insufficient-permission"]);

export function createGoogleConnectionHealthService({ tokenVault, googleClient } = {}) {
  if (typeof tokenVault?.status !== "function" || typeof tokenVault?.use !== "function" || typeof tokenVault?.markHealthy !== "function" || typeof tokenVault?.markReconnectRequired !== "function") throw new Error("encrypted-token-vault-required");
  if (typeof googleClient?.checkDriveAccess !== "function") throw new Error("google-drive-health-client-required");

  return Object.freeze({
    async check({ teacherId }) {
      const current = await tokenVault.status({ teacherId });
      if (!current.connected && !current.reconnectRequired) return Object.freeze({ status: "not-connected", action: "connect" });
      if (current.reconnectRequired) return Object.freeze({ status: "reconnect-required", action: "reconnect" });
      try {
        const result = await tokenVault.use({ teacherId, operation: (refreshToken) => googleClient.checkDriveAccess({ refreshToken }) });
        if (result?.ok !== true) throw new Error(result?.reason || "drive-health-check-failed");
        await tokenVault.markHealthy({ teacherId });
        return Object.freeze({ status: "connected", action: null, folderReady: result.folderReady === true });
      } catch (error) {
        const reason = String(error?.message || "drive-health-check-failed");
        if (RECONNECT_REASONS.has(reason)) {
          await tokenVault.markReconnectRequired({ teacherId, reason });
          return Object.freeze({ status: "reconnect-required", action: "reconnect" });
        }
        return Object.freeze({ status: "temporarily-unavailable", action: "retry" });
      }
    },
  });
}
