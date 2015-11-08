import React from 'react';
import EventLayout from './data/event-layout';

const IsResizeClass = new RegExp('(\\s|^)event(\\s|$)');

const Event = React.createClass({

    propTypes: {
        layout:        React.PropTypes.instanceOf(EventLayout),
        editComponent: React.PropTypes.func,
        onClick:       React.PropTypes.func,
        onDoubleClick:  React.PropTypes.func
    },

    onClick(ev) {
        if (!this.props.onClick){ return; }
        this.props.onClick(ev, this.props.layout.event);
        ev.stopPropagation();
    },

    onDoubleClick(ev) {
        if (!this.props.onDoubleClick){ return; }
        this.props.onDoubleClick(ev, this.props.layout.event);
        ev.stopPropagation();
    },

    onDragStart(ev) {
        if (!IsResizeClass.test(ev.target.className)){ return; }
        const bounds = this.refs.element.getBoundingClientRect();
        let resize;
        if (ev.clientY - bounds.top < 10){
            resize = { type: 'start' };

        } else if ( bounds.bottom - ev.clientY < 10 ){
            resize = { type: 'end' };
        } else {
            return;
        }
        this.props.onDragStart(resize, this.props.layout);
    },

    onDragStop(){
        this.setState({resize: false});
    },

    render() {

        let edit;
        if (this.props.layout.isEditing()){
            edit = <this.props.editComponent parent={this} event={this.props.layout.event} />;
        }
        return (
            <div
                ref="element"
                onMouseDown={this.onDragStart}
                style={this.props.layout.inlineStyles()}
                className={this.props.layout.classNames()}
            >
                <div className="evbody" onClick={this.onClick}>
                    {this.props.layout.event.render()}
                </div>
                {edit}
            </div>
        );
    }

});

export default Event;
