import React from 'react'
import {Form} from 'antd';
import BaseComponent from '../../base/BaseComponent'
import colModel from './colModel'

class UserEditForm extends BaseComponent{
    constructor(props) {
        super(props);
        let $t  = this;

        $t.extend("Form");

        $t.baseUrl      = '/api/model/';
        $t.groupNum     = 1;
        $t.moduleName   = "模型";
        $t.colModel     = colModel;
        $t.style ={width:'400px',height:'460px'};
    }
}

export default Form.create()(UserEditForm);


