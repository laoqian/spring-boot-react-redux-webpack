import React from 'react'
import {connect} from 'react-redux'
import {findDOMNode} from 'react-dom';
import BaseComponent from "../../base/BaseComponent";
import {Row,Col,Icon}  from 'antd'
import Color from 'color'

export default class IndexContainer extends BaseComponent{

    constructor(props){
        super(props);
        let $t = this;
        $t.moduleName  = 'sysIndex';
        $t.titlePrefix = "主页";
        $t.state.taskList =[];
        $t.state.notifyList =[];

        $t.regEvent("didMount",()=>{
            $t.getData();
            setInterval(()=>{
                $t.getData();
            },10000);
        });

        $t.getData =()=>{
            $t.u.get($t.getBaseUrl('/area/findPage?pageNum=0&pageSize=5'),bean=>$t.setState({taskList:bean.list}));
            $t.u.get($t.getBaseUrl('/area/findPage?pageNum=0&pageSize=5'),bean=>$t.setState({notifyList:bean.list}));
        }
    }

    render() {
        return (
            <div className="my-col-full my-wrapper" >
                <div className="my-index-ws">
                    <Row>
                        <Icon type="rocket" />
                        统计指标
                    </Row>
                    <hr/>
                    <Row>
                        <Col span={6}><CountComponent icon="user" name={'在线人数'} background="#006699"/></Col>
                        <Col span={6}><CountComponent icon="picture" name={'在线人数'} background="#660033"/></Col>
                        <Col span={6}><CountComponent icon="star" name={'在线人数'} background="#FF0066"/></Col>
                        <Col span={6}><CountComponent icon="line-chart" name={'在线人数'} background="#FF33FF"/></Col>
                    </Row>
                </div>
                <div className="my-index-ws">
                    <Row>
                        <Col span={12}>
                            <Icon type="team" />
                            代办任务&nbsp;(Top5)
                        </Col>
                        <Col span={12}>
                            <Icon type="tag" />
                            通知/公告&nbsp;(Top5)
                        </Col>
                    </Row>
                    <hr/>
                    <Row>

                        <Col span={12}>
                            <ul>
                                {this.state.taskList.map(task=>(
                                    <li>
                                        <div className="my-task">
                                            <a href="">{'['+task.name+'] '+"迪拜计划耗资10亿美元建世界最高塔"}</a>
                                            <span>{task.createDate}</span>
                                        </div>
                                        <hr/>
                                    </li>
                                ))}
                            </ul>
                        </Col>
                        <Col span={12}>
                            <ul>
                                {this.state.taskList.map(task=>(
                                    <li>
                                        <div className="my-task">
                                            <a href="">{'['+task.name+'] '+"迪拜计划耗资10亿美元建世界最高塔"}</a>
                                            <span>{task.createDate}</span>
                                        </div>
                                        <hr/>
                                    </li>
                                ))}
                            </ul>
                        </Col>
                    </Row>
                </div>
                <div className="my-index-ws">
                    <Row>
                        <Col span={24}>
                            <Icon type="pie-chart" />
                            系统统计饼图&nbsp;
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col span={12}>
                            col-12
                        </Col>
                        <Col span={12}>
                            col-12
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}


class CountComponent extends BaseComponent{

    constructor(props){
        super(props);
        this.state.count = parseInt(Math.random(0,1)*1000);

        this.regEvent("didMount",()=>{
            if(this.props.href){
                this.getCount();
                setInterval(()=>{
                    this.getCount();
                },10000);
            }
        });

        this.getCount = ()=>{
            this.u.get(this.props.href,(bean)=>{
                this.setState({count:bean.data.count});
            })
        }
    }

    render(){
        let color  = this.props.background||'#CC0099';
        let darken = Color(color).darken(0.1);

        return (
            <div className='my-index-count' style={{background:color}}>
                <div className="my-count-header">
                    <div className="flex flex-between-row">
                        <Icon type={this.props.icon || "pie-chart"} />
                        <div>
                            <div style={{'fontSize':'24px','textAlign':'right'}}>{this.state.count}</div>
                            <div>{this.props.name}</div>
                        </div>
                    </div>
                </div>
                <div className="my-count-footer" style={{background:darken}}>
                    <div className="flex flex-between-row">
                        <span>查看更多</span>
                        <div className="my-more">
                            <Icon type="arrow-right" style={{color:color}}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}