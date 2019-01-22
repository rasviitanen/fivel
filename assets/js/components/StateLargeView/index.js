// @flow
import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import ReactTooltip from 'react-tooltip';
import Checklist from '../Checklist';

import { State as EssenceState } from '../../types';

import { Button, Tooltip, Popover, Modal, OverlayTrigger } from 'react-bootstrap';

const styles = StyleSheet.create({
  modalContainer: {
    position: 'relative',
    modal: {
      position: 'absolute',
    },
    backdrop: {
      position: 'absolute',
    }
  }

 
});

type Props = {
    state: EssenceState,
}

type State = {
    show: boolean,
}

class StateLargeView extends Component<Props, State> {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        const popover = (
        <Popover id="modal-popover" title="popover">
            very popover. such engagement
        </Popover>
        );
        return (
        <div>
            <i className="fa fa-expand" style={{ cursor: "pointer" }} onClick={this.handleShow}/>
            <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{ this.props.state.name }</Modal.Title>
                <p>{ this.props.state.description }</p>
            </Modal.Header>
            <Modal.Body>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <div style={{ width: '70%'}}>
                    <Checklist  patterns={this.props.state.patterns}/>
                    <hr />
                    <h4>Todo</h4>
                    <hr />
                    <p>Contact Stakeholders</p>
                    <h4>Doing</h4>
                    <hr />

                    <h4>Done</h4>
                    <hr />
                    </div>
                <div style={{ width: '25%'}}>
                    <h4>Comments</h4>
                    <hr />
                </div>
            </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
            </Modal>
        </div>
        );
    }
    }

export default StateLargeView;