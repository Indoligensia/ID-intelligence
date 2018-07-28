import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar'
import Foo from './Foo';
import './App.css';

const paperStyle = {
    height: '100%',
    width: "100%",
    textAlign: 'center'
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'open': false,
            'show': null,
            'datlocations': [
                {
                    'name': "Klinik INTAN dr. Asdi Yudiono",
                    'latitude': -7.8007645966897,
                    'longitude': 110.37374542348948,
                    'streetAddress': "Jl. Masjid 3 Pakualaman"
                },
                {
                    'name': "Laboratorium Klinik PRODIA",
                    'latitude': -7.802766589451255,
                    'longitude': 110.37261328892649,
                    'streetAddress': "Jl. Bintaran Kulon 28"
                },
                {
                    'name': "Apotek dan Klinik Sultan Agung",
                    'latitude': -7.801416000799015,
                    'longitude': 110.3749680557057,
                    'streetAddress': "Jl. Sultan Agung 41"
                },
                {
                    'name': "Puskesmas Gondomanan",
                    'latitude': -7.803728984713199,
                    'longitude': 110.37059894079684,
                    'streetAddress': "Jl. Ledok Gondomanan 9A"
                },
                {
                    'name': "Puskesmas Danurejan 2",
                    'latitude': -7.793969283923237,
                    'longitude': 110.38015258930554,
                    'streetAddress': "Jl. Krasak Timur 34"
                },
                {
                    'name': "Puskesmas Kraton",
                    'latitude': -7.806050420012815,
                    'longitude': 110.36500006022327,
                    'streetAddress': "Jl. Musikanan 94"
                },
                {
                    'name': "Rumah Sakit Bethesda",
                    'latitude': -7.783329194028682,
                    'longitude': 110.3776623470296,
                    'streetAddress': "Jl. Sudirman 70 (Depan Galeria Mall)"
                }
            ],
            'map': '',
            'infowindow': '',
            'prevmarker': ''
        };
    }

    handleToggle = () => this.setState({open: !this.state.open});

    showFoo = () => {
        this.setState({show: 'foo', open: false });
    };

    render() {
        let content = null;

        switch(this.state.show) {
            case 'foo':
                content = (<Foo/>);
                break;

            default:
                content = <h1>Waiting</h1>
        }

        return (
            <div>

                <AppBar
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    title="ID-intelligence"
                    onLeftIconButtonClick={this.handleToggle}
                />

                <Drawer
                    docked={false}
                    width={300}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}>

                    <AppBar title="Search"/>
                    <MenuItem id="showFooId" onClick={this.showFoo}>Show Foo</MenuItem>
                </Drawer>

                <Paper style={paperStyle} zDepth={5}>
                    <Toolbar style={{"justifyContent": "center"}}>
                        <ToolbarTitle text="Yogyakarta"/>
                    </Toolbar>
                    {content}
                    <p>Click the icon on the AppBar to open the Drawer and then pick a menu item. The text above should change.</p>
                </Paper>

            </div>
        );
    }
}

export default App;