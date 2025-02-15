import React from "react";


class Header extends React.Component {
    title = this.props.title
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         left: 1,
    //         right: 1
    //     }
    // }
    //
    // componentDidMount() {
    //     setInterval(() => {
    //         const upperstreams = document.querySelector('.upperstreams');
    //         const right = this.state.right;
    //         upperstreams.style.Right = right + 'px';
    //         this.setState({
    //             right : right + 1
    //         })
    //     }, 1)
    // }

    render() {
        return (
            <header>
                <span className="upperstreams">
                    <img src={this.title} />
                    <img src={this.title} />
                    <img src={this.title} />
                    <img src={this.title} />
                    <img src={this.title} />
                    <img src={this.title} />
                    <img src={this.title} />
                    <img src={this.title} />
                    <img src={this.title} />
                </span>
                <p className="headertitle">Weather</p>
                <span className="downstreams">
                    <img src={this.title} />
                    <img src={this.title} />
                    <img src={this.title} />
                    <img src={this.title} />
                    <img src={this.title} />
                    <img src={this.title} />
                    <img src={this.title} />
                    <img src={this.title} />
                    <img src={this.title} />
                </span>
            </header>
        )
    }
}

export default Header;