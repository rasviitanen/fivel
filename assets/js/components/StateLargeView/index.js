// @flow
import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import ReactTooltip from 'react-tooltip';
import Checklist from '../Checklist';

import { State as EssenceState } from '../../types';

import { Button, Tooltip, Popover, Modal, OverlayTrigger } from 'react-bootstrap';

const styles = StyleSheet.create({
  entity: {
    background: "WhiteSmoke", 
    padding: '10px',
    borderRadius: '5px',
    margin: "0 -5px"
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
                <Modal show={this.state.show} onHide={this.handleClose} bsSize="large">
                <Modal.Header closeButton>
                    <Modal.Title>{ this.props.state.name }</Modal.Title>
                    <p>{ this.props.state.description }</p>
                </Modal.Header>
                <Modal.Body>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <div style={{ width: '70%'}}>
                        <h3>Checklist</h3>
                        <Checklist  patterns={this.props.state.patterns}/>
                        <hr />
                        <div className={css(styles.entity)}>
                            <h4>To Do </h4>
                            <div style={{ margin: '5px', padding: '3px 8px', cursor: 'pointer', background: '#fff', borderRadius: '3px'}}>Contact Stakeholders</div>
                            <div style={{ margin: '5px', padding: '3px 8px', cursor: 'pointer', background: '#fff', borderRadius: '3px'}}>Contact</div>
                            <div style={{ margin: '5px', padding: '3px 8px', cursor: 'pointer', background: '#fff', borderRadius: '3px' }}>asd asdas</div>
                            <div style={{ margin: '5px', padding: '3px 8px', cursor: 'pointer', color: '#fff', background: 'SlateBlue', borderRadius: '3px'}}><i class="fa fa-plus-circle" aria-hidden="true"></i> Create new</div>
                            <hr />
                            <h4>Doing</h4>
                            <hr />

                            <h4>Done</h4>
                            <hr />
                        </div>
                        </div>
                    <div className={css(styles.entity)} style={{ width: '28%' }}>
                        <h4>Discussion</h4>
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