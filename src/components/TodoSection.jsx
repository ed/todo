import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Todo from './Todo';
import { Button, Modal, Tabs, Tab, InputGroup} from 'react-bootstrap'


class TodoSection extends Component {


    constructor(props) {
        super(props);
        const { handleClick, tasks, actions, sections } = this.props;
        this.onClick = this.onClick.bind(this);
        this._onClick = this._onClick.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.state = {
            key: 0,
            max: 0,
            showModal: false,
            section: '',
            name: ''
        }
    };

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    handleSelect(key) {
        if (key == "new")
            this.open();
        else
            this.setState({ key });
    }

    onChange(e) {
        e.preventDefault();
        this.setState({ [e.target.id]: e.target.value });
    };

    onKeyDown(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            if (e.target.value) {
                this.setState({ [e.target.id]: e.target.value });
                if ([e.target.id] == 'name') {
                    this.props.actions.addTask(e.target.value, "todo");
                    this.setState({ name: '' });
                }
                else if ([e.target.id] == 'section') {
                    this.close();
                    let obj = {
                        val: this.state.section,
                        key: this.state.max + 1
                    }
                    this.props.sections.push(obj)
                    this.handleSelect(obj.key)
                    this.setState({ section: '', max: obj.key })
                }
            }
        }
    }

    onClick(e) {
        e.preventDefault();
        if (this.state.section == '')
            this.close()
    }

    _onClick(e) {
        e.preventDefault();
    }

    render() {
        var handleClick = this.props.handleClick;
        return (
            <div className="todo-section">
                <div className="modal">
                    <Modal show={this.state.showModal} onHide={this.close}>
                        <Modal.Header closeButton>
                            <Modal.Title>Enter Section name</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <textarea autoFocus id="section" maxLength="10" onChange={(e) => this.onChange(e) } onKeyDown={(e) => this.onKeyDown(e) }/>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={(e) => this.onClick(e) }>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <Tabs activeKey={this.state.key} id="todo-section-tabs" onClick={this._onClick} onSelect={this.handleSelect}>
                    <Tab eventKey={0} title="Main">
                        <textarea
                            autoFocus
                            className="todo-name-setter"
                            id="name"
                            value={this.state.name}
                            onChange={this.onChange}
                            onKeyDown={this.onKeyDown}
                            />
                        <ul className="todo-list" ref="todoList">
                            {this.props.tasks.entrySeq().map(([key, value]) =>
                                <Todo key={value.get('id') } todo={value.get('name') } idx={key} handleClick={handleClick} />) }
                        </ul>
                    </Tab>
                    {this.props.sections.map((obj) =>
                        <Tab key={obj.key} eventKey={obj.key} title={obj.val}> </Tab>) }
                    <Tab eventKey={"new"} title="+"> </Tab>
                </Tabs>
            </div>
        );
    }
};

export default TodoSection;
