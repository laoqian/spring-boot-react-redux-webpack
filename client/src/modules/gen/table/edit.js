import React            from 'react'
import {connect}        from 'react-redux'
import {Form, Modal}    from 'antd';
import JqgridWrapper    from '../../grid/index'
import BaseComponent    from "../../base/BaseComponent";
import colModel         from './colModel'
import tableColModel    from './tableColModel'

class GenEditForm extends BaseComponent {
    constructor(props) {
        super(props);
        let $t = this;

        $t.extend("List", "Form");
        $t.baseUrl = '/api/gen/';
        $t.moduleName = '业务表';
        $t.state.colModel = colModel;

        $t.setGridInitParam({
            url: $t.getBaseUrl('findTableColumn'),
            baseUrl: $t.baseUrl,
            gridName: "sysGenEdit",
            inlineEdit: true,
            pagerAble: false,
            rownumbers: false,
            colModel: tableColModel,
            ondblClickRow: null
        });

        $t.saveData = () => {
            let list;
            $t.saveEditList();
            list = $t.grid.getRowData(null, true);
            $t.defaultSaveData('saveBatch', 'post', data => ({data, list}), () => {
                let {grid} = $t.props.location;
                if (grid) {
                    grid.trigger('reloadGrid');
                }

                $t.reload()
            })
        };

        $t.setQueryParam = () => {
            let {getFieldValue} = $t.props.form;
            let name = getFieldValue('name');
            name =name?name:$t.state.editData.name;
            // $t.grid.setGridParam({postData: {genTableId:$t.state.editData.id,tableName:name}});
        };


        $t.beforeBindData = (type, row) => {
        };

        $t.setDefaultData = (row) => {
            return row;
        };

        $t.loadTableInfo = (tableName) => {
            let grid = $t.grid;
            grid.setGridParam({postData: {tableName}});
            grid.trigger('reloadGrid');
        };

        $t.regEvent("willMount",()=>{
            let value = [],column = colModel[0];

            $t.props.tableList.forEach(op => {
                value.push({value: op, label: op});
            });

            if (!column.editoptions) {
                column.editoptions = {};
            }

            column.editoptions.value = value;
        });

        $t.regEvent('didMount', () => {
            $t.register($t.props.form);
        })
    }

    render() {
        return (
            <div style={{width: '1200px', height: '600px'}} className="flex-vs">
                <Form ref="form" className="my-form-square" children={this.renderRows(this.props.form,this.state.colModel,4)}/>
                <JqgridWrapper options={this.gridOptions} ref="grid"/>
            </div>
        )
    }
}

export default  Form.create()(GenEditForm);

