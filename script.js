function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
    center: { lat: 39.8283, lng: -98.5795 } // Center of the US
  });

  const locations = [
    {
      title: "New York Office",
      position: { lat: 40.7128, lng: -74.0060 },
      icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      description: "Our East Coast base of operations located in Manhattan."
    },
    {
      title: "San Francisco Studio",
      position: { lat: 37.7749, lng: -122.4194 },
      icon: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
      description: "Our creative team working from downtown SF."
    },
    {
      title: "London Hub",
      position: { lat: 51.5074, lng: -0.1278 },
      icon: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
      description: "Our global office serving Europe and beyond."
    }
  ];

  const infoWindow = new google.maps.InfoWindow();

  locations.forEach(loc => {
    const marker = new google.maps.Marker({
      position: loc.position,
      map: map,
      title: loc.title,
      icon: loc.icon
    });

    marker.addListener("click", () => {
      infoWindow.setContent(`<h6>${loc.title}</h6><p>${loc.description}</p>`);
      infoWindow.open(map, marker);
    });
  });

  // Try HTML5 geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        new google.maps.Marker({
          position: userPos,
          map: map,
          title: "Your Location",
          icon: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
        });

        map.setCenter(userPos);
        map.setZoom(10);
      },
      () => {
        console.warn("Geolocation permission denied or unavailable.");
      }
    );
  }
}
