// Das hier ist eine zusätzliches Error Fallback damit auch Fehler auf dem Screen angezeigt werden, die bereits entstehen bevor React gerendert werden konnte, z.B bei den Importen in der App.tsx
// Die Funktion wird in der main.tsx aufgerufen
export default function WindowFallback() {
  window.onerror = function (message, source, lineno, colno, error) {
    console.error('Global error caught:', {
      message,
      source,
      lineno,
      colno,
      error,
    });

    // Optional: Zeige statische Fallback-UI
    document.body.innerHTML = `
    <div style="padding: 2rem; font-family: sans-serif;">
    <h1>Something went wrong</h1>
    <p>${message}</p>
    <pre>${error?.stack || ''}</pre>
    </div>
    `;
  };

  window.onunhandledrejection = function (event) {
    console.error('Unhandled promise rejection:', event.reason);

    // Optional: Ähnliche statische Fallback-UI anzeigen
    document.body.innerHTML = `
    <div style="padding: 2rem; font-family: sans-serif;">
    <h1>Unexpected Error</h1>
    <p>${event.reason?.message || event.reason}</p>
    </div>
    `;
  };
}
