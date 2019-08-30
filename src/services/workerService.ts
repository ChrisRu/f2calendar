export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('./sw-test/sw.js', {
        scope: './sw-test/',
      })
      console.log('Registration succeeded. Scope is ' + registration.scope)
    } catch (error) {
      console.log('Registration failed with ' + error)
    }
  }
}
