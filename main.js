// Register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(error) {
        console.log('ServiceWorker registration failed: ', error);
    });
}

document.getElementById('enable-notifications').addEventListener('click', function() {
    Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
            new Notification('Airdrop Reminder', {
                body: 'Don\'t forget to check your pending airdrops!',
                icon: '/icon.png'
            });
        }
    });
});

document.getElementById('email-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    fetch('/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    }).then(response => response.json())
      .then(data => alert(data.message))
      .catch(error => console.error('Error:', error));
});
