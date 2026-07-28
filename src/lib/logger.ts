type LogLevel = "info" | "warn" | "error" | "debug";

function formatTime() {
  return new Date().toISOString();
}

function log(level: LogLevel, tag: string, message: string, data?: unknown) {
  const entry = {
    time: formatTime(),
    level,
    tag,
    message,
    ...(data !== undefined ? { data } : {}),
  };
  const line = `[${tag}] ${entry.time} ${level.toUpperCase()} ${message}`;
  if (level === "error") console.error(line, data ?? "");
  else if (level === "warn") console.warn(line, data ?? "");
  else console.log(line, data ?? "");
}

export function createLogger(tag: string) {
  return {
    info(message: string, data?: unknown) {
      log("info", tag, message, data);
    },
    warn(message: string, data?: unknown) {
      log("warn", tag, message, data);
    },
    error(message: string, data?: unknown) {
      log("error", tag, message, data);
    },
    debug(message: string, data?: unknown) {
      log("debug", tag, message, data);
    },
  };
}
