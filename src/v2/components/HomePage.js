import React from 'react';
import NavigationM from "./NavigationM";
import SpotlightM from "./SpotlightM";

class HomePage extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div>
                {/*<NavigationM*/}
                    {/*clicked={'HomePage'}*/}
                {/*/>*/}
                <SpotlightM />
            </div>
        )
    }
}

export default HomePage;