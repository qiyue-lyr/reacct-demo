import React from 'react';
import Proptypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom'

class Pagination extends React.Component{

    static defaultProps = {
        pages:1,
        page:1
    }

    static propTypes = {
        pages: Proptypes.number,
        page: Proptypes.number
    }

    render(){
        let {pages, page} = this.props;

        return (
            <div className="pagination">
                {
                    (new Array(pages)).fill('1').map((v, i) => {
                        return (
                            <Link 
                                key={++i}
                                className={i === page ? 'active' : ''}
                                to={'/list/?p='+i}
                            >
                                {i}
                            </Link>
                        );
                    })
                }
                <span>
                    前往
                    <input type="text" className="goto" onKeyDown={({target:{value}})=>{
                        if (value !== '') {
                            this.props.history.push('/list/?p=' + value);
                        }
                    }} />
                    页 
                </span>
                
            </div>
        );
    }
}

export default withRouter(Pagination);
