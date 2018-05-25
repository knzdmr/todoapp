import React,{Component} from 'react';


class SearchBar extends Component { //React.Component
    constructor(props) {
        super(props);
        this.state = {term: ''};
    }

    render() {
//return <input osnChange={this.onInputChange}/>;

        return (


            <div className="col-md-9 col-7  nomargin d-inline-block">
                <input
                    placeholder='search'
                    className="search-bar col-md-12"
                    value={this.state.term} //controlled input
                    onChange={event => {
                        this.onInputChange(event.target.value)
                    }}/>
            </div>


        );
    }

    onInputChange(term) {
        console.log(term);
        this.setState({term});
        this.props.onSearchTermChange(term);

    }
}
export  default  SearchBar;