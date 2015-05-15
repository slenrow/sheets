import React from 'react';
import Immutable from 'immutable';
import History from 'immutable-history';
import Sheet from './Sheet.js';
import Toolbar from './Toolbar.js';

class SheetApp extends React.Component {

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !(Immutable.is(this.props.sheetData, nextProps.sheetData) &&
                    Immutable.is(this.state.sheetData, nextState.sheetData));
    }

    componentWillMount() {
        this.setState({
            history: new History(this.props.sheetData, this._cursorChange.bind(this)),
        });
    }

    _cursorChange(cursor) {
        this.setState({
            sheetData: cursor
        });
    }

    _undo() {
        this.state.history.undo();
    }

    render() {
        return (
            <div>
                <Toolbar
                    undo={this._undo.bind(this)}
                    sheetData={this.state.sheetData}
                />
                <div className='sheet-container'>
                    <Sheet
                        sheetData={this.state.sheetData}
                    />
                </div>
            </div>
        );
    }
};

export default SheetApp;
