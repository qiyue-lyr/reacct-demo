import React from 'react';
import {connect} from 'react-redux'

class Item extends React.Component{
    render(){
        console.log(this.props)
        // let {items, match} = this.props;
        
        // let id = Number(match.params.id) || 0;
        // let item = items.find(item => item.id === id);
        let {item} = this.props

        return item ? (
            <div style={{paddingLeft:25}}>
                <h2>商品详情 - {item.name}</h2>
                <dt>ID</dt>
                <dd>{item.id}</dd>
                <dt>名称</dt>
                <dd>{item.name}</dd>
                <dt>价格</dt>
                <dd>￥ {(item.price / 100).toFixed(2)}</dd>
            </div>
        ) : <div>不存在该商品！</div>;
    } 
}


// 从 List 进 Item 可以，但是刷新 Item，store 无数据 ？？
// 因为刷新页面，还没有进List，store还没有从后台获取到
// 所以在Index.js 的 componentDidMount中 一次性从后台调取所需数据，注入store
const mapStateToProps = (store, ownProps)=>{
    let id = Number(ownProps.match.params.id)||0;
    return {
        item: store.items.find((v)=>v.id===id)
    }; 
}

// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
export default connect(mapStateToProps)(Item)