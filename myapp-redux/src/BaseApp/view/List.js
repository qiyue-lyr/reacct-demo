import React from 'react';
import {Link} from 'react-router-dom'

import {connect} from 'react-redux'//可以注入store对象


import Pagination from '../Component/Pagination'

class List extends React.Component{
    constructor(){
        super();
        this.state = {
            pageSize: 5,
            sort:'null'
        }
        this.changeSort = this.changeSort.bind(this)
    }

    changeSort({target:{value}}){
        console.log(value)
        this.setState({
            sort:value
        })
        
    }

    render(){
        // console.log(this.props)

        let {pageSize, sort} = this.state;
        const {location:{search}} = this.props;

        const qs = new URLSearchParams(search);
        let page = Number(qs.get('p'))||1;//取'?'后面
         
        let {items} = this.props;
        let pages = Math.ceil(items.length/pageSize);
        

        // 排序
        let itemsSort = items.sort((a, b) => {
            if(sort !== 'null'){
                return sort === 'asc'  ? a.price - b.price : b.price - a.price
            }else{
                return a.id - b.id;
            }
        });

        // 限制每页展示数量
        let curItems = itemsSort.slice((page-1)*pageSize,page * pageSize);
        
        return (
           
            <div style={{padding:20}}>
                <h2>商品列表</h2>

                <ul className="item-list">
                    <li className="head">
                        <span>名称</span>
                        <span>
                            价格 
                            <select onChange = {this.changeSort}>
                                <option value="null">默认</option>
                                <option value="asc">从低到高</option>
                                <option value="desc">从高到低</option>
                            </select>
                        </span>
                    </li>
                    {
                        curItems.map(item=>(
                            <li key={item.id}>
                                <span>
                                    <Link to={'/list/Item/' + item.id}>{item.name}</Link>
                                </span>
                                <span>￥ {(item.price / 100).toFixed(2)}</span>
                            </li>
                        ))
                    }
                </ul>

                <Pagination pages={pages} page={page}/>
                
                <div style={{paddingTop:20}}>
                    共计 <strong> {items.length} </strong>条，每页展示
                    <input type="text" defaultValue={pageSize} className="goto" onKeyUp={({target:{value}})=>{
                        if (value !== '') {
                            this.setState({pageSize: Number(value)});
                        }
                    }} />
                    条
                </div>
            </div>
        );
    }
}

export default connect(store=>{
    return {
        items: store.items
    }; 
})(List)