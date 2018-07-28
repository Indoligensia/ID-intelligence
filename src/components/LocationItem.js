import React from 'react';
import MenuItem from 'material-ui/MenuItem';

class LocationItem extends React.Component {
    render() {
        return (
            <MenuItem 
                onKeyPress={this.props.openInfoWindow.bind(this, this.props.data.marker)}
                onClick={this.props.openInfoWindow.bind(this, this.props.data.marker)}>
                    {this.props.data.longname}
            </MenuItem>
        );
    }
}

export default LocationItem;