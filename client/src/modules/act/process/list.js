import React from 'react'
import {connect} from 'react-redux'
import ToolBar from '../../../layouts/toolBar'
import JqgridWrapper from '../../grid/index'
import {findDOMNode} from 'react-dom';
import BaseComponent from "../../base/BaseComponent";
import colModel from './colModel'


export default class SysModel extends BaseComponent{

    constructor(props){
        super(props);

        let $t = this;

        $t.extend("List");
        $t.baseUrl     = '/api/process/';
        $t.titlePrefix = "流程";
        $t.moduleName  = 'actProcess';

        $t.setGridInitParam({
            url:$t.getBaseUrl('findPage'),
            gridName:this.moduleName,
            colModel
        });

        $t.toolBarOptions = {
            left: {
                items: [
                    {
                        name: 'type', type: 'input', text: '类型:', palaceHolder: '类型',
                        rules: [],
                    }
                ],
                searchBtn: {
                    text: '查询',
                    icon: 'search'
                }
            },
            reload:true,
            right :{
                items :[
                    {name: '启动'      ,  icon: 'plus',       },
                    {name: '转为模型'  ,   icon: 'rollback',   },
                    {name: '删除'      ,  icon: 'delete',     },
                ]
            }
        };

        $t.confirm('转为模型',row=>`确定将流程-${row.name}转为模型吗？`,row=>$t.u.getWithTip($t.getBaseUrl("/toModel?id="+row.id)));
    }

    render() {
        return (
            <div className="my-col-full" >
                <ToolBar {...this.toolBarOptions} click={this.click} register={this.register} />
                <JqgridWrapper options={this.gridOptions}/>
            </div>
        )
    }
}

