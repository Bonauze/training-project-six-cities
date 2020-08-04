import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import leaflet, {Map as MapInterface, Marker as MarkerInterface, Icon as IconInterface} from 'leaflet';

import {getMouseEnterOfferId} from '../../reducer/offers/selectors';

import {OffersCoordinates as OffersCoordinatesInterface} from '../../types';

interface Props extends OffersCoordinatesInterface {
  activeCoordinatesId: number;
}

class Map extends PureComponent<Props> {
  private readonly mapRef: React.RefObject<HTMLDivElement>;
  private _map: MapInterface;
  private _markers: {
    id: number;
    marker: MarkerInterface;
  }[];
  private readonly _defaultIcon: IconInterface;
  private readonly _activeIcon: IconInterface;

  constructor(props) {
    super(props);
    this.mapRef = React.createRef();

    this._map = null;
    this._markers = [];
    this._defaultIcon = leaflet.icon({iconUrl: `/img/pin.svg`, iconSize: [30, 30]});
    this._activeIcon = leaflet.icon({iconUrl: `/img/pin-active.svg`, iconSize: [30, 30]});
  }

  componentDidMount() {
    const {centerCoordinates, zoom} = this.props;

    this._map = leaflet.map(this.mapRef.current, {
      center: centerCoordinates,
      zoom,
      zoomControl: true,
      scrollWheelZoom: false,
    });

    this._map.setView(centerCoordinates, zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this._map);

    this._renderMarkers();
  }

  componentDidUpdate(prevProps) {
    const {centerCoordinates, zoom, markersCoordinates, activeCoordinatesId} = this.props;

    if (prevProps.centerCoordinates !== centerCoordinates) {
      this._changeCenter();
    }

    if (prevProps.zoom !== zoom) {
      this._changeZoom();
    }

    if (prevProps.markersCoordinates !== markersCoordinates ||
        prevProps.activeCoordinatesId !== activeCoordinatesId) {
      this._clearMarkers();
      this._renderMarkers();
    }
  }

  private _changeCenter() {
    const {centerCoordinates, zoom} = this.props;

    this._map.flyTo(centerCoordinates, zoom, {
      duration: 1
    });
  }

  private _changeZoom() {
    const {zoom} = this.props;

    this._map.setZoom(zoom);
  }

  private _clearMarkers() {
    this._markers.forEach(({marker}) => marker.remove());
    this._markers = [];
  }

  private _renderMarkers() {
    const {markersCoordinates, activeCoordinatesId} = this.props;
    const {_activeIcon, _defaultIcon} = this;

    markersCoordinates.forEach(({id, coordinates}) => {
      const marker = leaflet.marker(coordinates, {
        icon: id === activeCoordinatesId ? _activeIcon : _defaultIcon
      });
      marker.addTo(this._map);
      this._markers.push({id, marker});
    });
  }

  render() {
    return <div ref={this.mapRef} style={{height: `100%`}} />;
  }
}

const mapStateToProps = (state) => ({
  activeCoordinatesId: getMouseEnterOfferId(state),
});

export {Map};
export default connect(mapStateToProps)(Map);
