import React,{ Component } from "react";

class ErrorBoundary extends Component {
    constructor(props){
        super(props);
        this.state = { hasError : false };
    }

    static getDerivedStateFromError(error) {
        return { hasError : true }
    }

    componentDidMount(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.resetKey !== this.props.resetKey) {
          this.setState({ hasError: false });
        }
      }

    render(){
        if (this.state.hasError) {
            return (
                <div className="w-100 d-flex justify-content-center align-items-center flex-column row-gap-2" style={{height:'100vh'}}>
                    <img src="/assets/somethingwentwrong-removebg-preview.png" style={{width:'180px', height:'160px',objectFit:'contain'}}/>
                <div className="text-center"><h4>Something went wrong.</h4>
                <p className="text-center">
                    Don't worry we'll look into it straight away.<br/>Click below to return back
                </p>
                <button className="btn btn-secondary rounded-1 px-3 py-1 font-16" onClick={()=>window.location.href='/'}>
                    Back
                </button>
                </div>
                </div>
            )
          }
          return this.props.children;
        }
    }
    export default ErrorBoundary;