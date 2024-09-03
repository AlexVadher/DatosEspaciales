let map;
let marker;
let geocoder;

// inicialización del mapa de google maps
function initMap() {
    // configuración del mapa de google maps con la ubicación de Quito
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 4.632613958669109, lng: -74.08081778845128},
        zoom: 15,
        mapTypeControl: false, // control de tipo de mapa
        streetViewControl: false, // control de Street View (Pegman)
        fullscreenControl: false, // control de pantalla completa (botón de pantalla completa)
        zoomControl: false, // control de zoom (botones de zoom)
    });

    // Crear una ventana de información con el detalle del punto
    infoWindow = new google.maps.InfoWindow({
        content: `
            <div class="p-4 bg-white rounded-lg shadow-md">
                <div class="flex items-center">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5TwVYVOGOdvLBDXtpLtsk6EJ4btc6u3Ul-w&s" alt="uniempresarial" class="w-12 h-12 rounded-full mr-4">
                    <div>
                        <strong class="text-lg font-bold">Uniempresarial</strong>
                        <p class="text-sm text-gray-600">Este es el punto inicial.</p>
                    </div>
                </div>
            </div>
        `,
    });

    // marcador inicial en el mapa de google maps
    marker = new google.maps.Marker({
        map: map, // mapa de google maps(que se ha creado)
        draggable: true, // permite mover el marcador
        animation: google.maps.Animation.DROP, // animación de caída del marcador
        position: {lat: 4.632613958669109, lng: -74.08081778845128}, // posición inicial del marcador
        title: 'Mapa de Uniempresarial', // título del mapa
    });

    // Abrir la ventana de información en el primer marcador
    infoWindow.open(map, marker);

    // Agrega un evento de clic al mapa para agregar un marcador en el mapa
    map.addListener('click', (event) => {
        if (marker) {
            marker.setMap(null); // Elimina el marcador anterior si existe
        }
        // Agrega un nuevo marcador en el mapa en la posición donde se hizo clic
        marker = new google.maps.Marker({
            position: event.latLng,
            map: map,
            draggable: true, // Permite mover el marcador
        });

        infoWindow.close(); // Cierra la ventana de información anterior

        // Actualiza las coordenadas en algún campo de tu formulario con las coordenadas del marcador
        const lat = event.latLng.lat();
        const long = event.latLng.lng();
        document.getElementById('Ubicacion').value = `${lat}, ${long}`;
    });

    // evento de arrastrar el marcador  en el mapa de google maps
    marker.addListener('click', toggleBounce);
    geocoder = new google.maps.Geocoder();
}

// animación de marcador en el mapa
function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}
// busqueda de dirección en el mapa
function searchAddress() {
    const address = document.getElementById('busqueda').value;
    geocoder.geocode({address: address}, (results, status) => {
        if (status === 'OK') {
            map.setCenter(results[0].geometry.location); // Centra el mapa en la dirección buscada
            marker.setPosition(results[0].geometry.location); // Coloca un marcador en la dirección buscada

            // Actualiza el campo de dirección con la dirección buscada
            const busquedadireccion = address;
            document.getElementById('Direccion').value = busquedadireccion; // Actualiza la dirección en el campo de dirección con la dirección buscada

            // Actualiza las coordenadas en el campo de ubicación con las coordenadas de la dirección
            const lat = results[0].geometry.location.lat();
            const lng = results[0].geometry.location.lng();
            document.getElementById('Ubicacion').value = `${lat}, ${lng}`;
        } else {
            alert('No es posible usar la localización por un error: ' + status);
        }
    });
}

// función para mostrar y ocultar el menú de navegación
function toggleMenu() {
    const navbarNav = document.getElementById('navbarNav');
    navbarNav.classList.toggle('hidden');
}
