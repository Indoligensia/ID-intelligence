import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import LocationList from './LocationList';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'open': false,
            'show': null,
            'datlocations': [
                {
                    'name': "Puskesmas Kraton",
                    'latitude': -7.806050420012815,
                    'longitude': 110.36500006022327
                },
                {
                    'name': "Rumah Sakit Bethesda",
                    'latitude': -7.783329194028682,
                    'longitude': 110.3776623470296
                },
                {
                    'name': "Klinik INTAN dr. Asdi Yudiono",
                    'latitude': -7.8007645966897,
                    'longitude': 110.37374542348948
                },
                {
                    'name': "Masjid At-Tauhid",
                    'latitude': -7.802766589451255,
                    'longitude': 110.37261328892649
                },
                {
                    'name': "Sate Padang Mamak Sharil",
                    'latitude': -7.801416000799015,
                    'longitude': 110.3749680557057
                },
                {
                    'name': "Bakmi Djawa Babinlon",
                    'latitude': -7.803728984713199,
                    'longitude': 110.37059894079684
                },
                {
                    'name': "Ruly's Bike Works",
                    'latitude': -7.793969283923237,
                    'longitude': 110.38015258930554
                }
            ],
            'map': '',
            'infowindow': '',
            'prevmarker': ''
        };

        this.initMap = this.initMap.bind(this);
        this.openInfoWindow = this.openInfoWindow.bind(this);
        this.closeInfoWindow = this.closeInfoWindow.bind(this);
    }

    handleToggle = () => this.setState({open: !this.state.open});
    
    componentDidMount() {
        window.initMap = this.initMap;
        loadMapJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyBXCJFXLQPUD5i3eglS9sfdzCTkadtx4Cs&callback=initMap')
    }

    initMap() {
        var self = this;
        var mapview = document.getElementById('map');
        mapview.style.height = window.innerHeight + "px";
        var map = new window.google.maps.Map(mapview, {
            center: {lat: -7.797068, lng: 110.370529},
            zoom: 14,
            mapTypeControl: false
        });

        var InfoWindow = new window.google.maps.InfoWindow({});

        window.google.maps.event.addListener(InfoWindow, 'closeclick', function () {
            self.closeInfoWindow();
        });

        this.setState({
            'map': map,
            'infowindow': InfoWindow
        });

        window.google.maps.event.addDomListener(window, "resize", function () {
            var center = map.getCenter();
            window.google.maps.event.trigger(map, "resize");
            self.state.map.setCenter(center);
        });

        window.google.maps.event.addListener(map, 'click', function () {
            self.closeInfoWindow();
        });

        var datlocations = [];
        this.state.datlocations.forEach(function (location) {
            var longname = location.name;
            var marker = new window.google.maps.Marker({
                position: new window.google.maps.LatLng(location.latitude, location.longitude),
                animation: window.google.maps.Animation.DROP,
                map: map
            });

            marker.addListener('click', function () {
                self.openInfoWindow(marker);
            });

            location.longname = longname;
            location.marker = marker;
            location.display = true;
            datlocations.push(location);
        });
        this.setState({
            'datlocations': datlocations
        });
    }

    openInfoWindow(marker) {
        this.closeInfoWindow();
        this.state.infowindow.open(this.state.map, marker);
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        this.setState({
            'prevmarker': marker
        });
        this.state.infowindow.setContent('Loading Data...');
        this.state.map.setCenter(marker.getPosition());
        this.state.map.panBy(0, -200);
        this.getMarkerInfo(marker);
    }

    getMarkerInfo(marker) {
        var self = this;
        var clientId = "LG0GCJH0SBNPTAOEJCSFKZGNAGBPZYGOQ3OYD1H0C1SSDBPW";
        var clientSecret = "N5UWB0SD3UJCYKPZR24RNKBJYSOJPRLHMRMCTFHB4BRDACJ5";
        var url = "https://api.foursquare.com/v2/venues/search?client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20130815&ll=" + marker.getPosition().lat() + "," + marker.getPosition().lng() + "&limit=1";
        fetch(url)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        self.state.infowindow.setContent("Sorry data can't be loaded");
                        return;
                    }

                    response.json().then(function (data) {
                        var location_data = data.response.venues[0];
                        var name = '<b>' + location_data.name + '</b><br>';
                        var address = '<i>address: ' + location_data.location.address + '</i><br><br>';
                        var readMore = '<a href="https://foursquare.com/v/'+ location_data.id +'" target="_blank">read more on Foursquare website</a>'
                        self.state.infowindow.setContent(name + address + readMore);
                    });
                }
            )
            .catch(function (err) {
                self.state.infowindow.setContent("Sorry data can't be loaded");
            });
    }

    closeInfoWindow() {
        if (this.state.prevmarker) {
            this.state.prevmarker.setAnimation(null);
        }
        this.setState({
            'prevmarker': ''
        });
        this.state.infowindow.close();
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                <AppBar
                    title="ID-intelligence: Yogyakarta"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonClick={this.handleToggle}
                />
                    <Drawer
                        docked={false}
                        width={300}
                        open={this.state.open}
                        onRequestChange={(open) => this.setState({open})}
                        aria-labelledby="menu">

                        <AppBar title="locations"
                        onLeftIconButtonClick={this.handleToggle}/>
                    
                        <div>
                            <br />
                            <LocationList 
                                key="100" 
                                datlocations={this.state.datlocations} 
                                openInfoWindow={this.openInfoWindow}
                                closeInfoWindow={this.closeInfoWindow}/>
                        </div>
                    </Drawer>                    
                    <div id="map"></div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;

function loadMapJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}