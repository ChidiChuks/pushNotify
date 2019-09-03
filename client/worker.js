console.log('Service Worker Loaded...');

self.addEventListener('push', e => {
    const data = e.data.json();
    console.log('Push Received...');
    self.registration.showNotification(data.title, {
        body: 'Notified by Chidi Chuks!',
        icon: 'http://image.ibb.co/frYOFD/tmlogo.png'
    });
});