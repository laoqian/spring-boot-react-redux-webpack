import React from 'react'
import createHistory from 'history/createBrowserHistory'
import {findDOMNode} from 'react-dom';
import Modal from './Modal'

let ListComponent = function(){
    let $t = this;
    let u = this.u;
    $t.componentCheck();
    $t.gridOptions = {
        setQueryParam: () => $t.setQueryParam(),
        ondblClickRow: function (id) {
            $t.editRow(id);
        },
        regGrid:grid =>$t.grid=grid
    };

    $t.setGridInitParam = (options) => {
        $t.gridOptions = Object.assign($t.gridOptions, options);

        /*支持行编辑时双击为编辑当前行*/
        if (options.inlineEdit) {
            $t.gridOptions.ondblClickRow = function (id) {
                $(this).editRow(id, false, function (id) {
                    this.p.editList.push(id);
                    if (this.p.treeGrid) {
                        $('#' + id, this).find('.tree-wrap-ltr').next().css({flex: 1, display: 'flex'});
                    }
                });
            }
        }
    };

    $t.getId = $t.getSelectedId = () =>{
        return $t.grid?$t.grid.getGridParam('selrow'):null;
    };

    $t.getSelRowData = () => {
        let id = $t.getSelectedId();
        return id ? Object.assign($t.grid.getRowData(id), {id}) : null;
    };

    $t.dialog("修改",row=>{
        if(!$t.editForm){
            throw new Error("未定义编辑表单组件");
        }
        Modal.open(<$t.editForm row={row}/>,{afterOk:$t.reload,title:$t.titlePrefix+"修改-"+row.id});
    });

    $t.dialog("添加",row=>{
        row?row.id=null:null;
        if(!$t.editForm){
            throw new Error("未定义编辑表单组件");
        }
        Modal.open(<$t.editForm row={row}/>,{afterOk:$t.reload,title:$t.titlePrefix+"添加"});
    });

    $t.dialog('删除',row=>Modal.confirm(`确定删除-${row.id}`,
        {
            afterOk:$t.reload,
            title:$t.titlePrefix+"删除",
            okHander:()=>$t.getWithTip("delete?id="+row.id)
        })
    );

    $t.confirm = (name,text,ok)=>{
        $t.dialog(name,row=>Modal.confirm(_.isFunction(text)?text(row):text,{title:"提示",okHander:()=>ok(row)}));
    };

    $t.eventFunc['重加载'] = $t.reload = ()=>{
        $t.grid.trigger('reloadGrid');
    };

    $t.saveEditList = () => {
        let g = $t.grid;
        let list = g.getRowData(null, true);
        let editList = g[0].p.editList;
        let eList = [];

        try{
            editList.forEach(id => {
                g.saveRow(id, null, null, null, null, (rowid, msg) => {
                    throw new Error(msg);
                });
            });
        }catch (err){
            u.error(err.toString());
            return false;
        }

        list.forEach(row => {
            $.inArray(row.id, editList) !== -1 ? eList.push(row) : null;
        });

        $t.editList = eList;
        return true;
    };

    $t.click = item => $t.eventFunc[item.name] ? $t.eventFunc[item.name]() : console.error('Warning:未定义的事件：' + item.name);

    $t.regEvent("升级", 'upgradeRow', () => $t.chgLevel(0));
    $t.regEvent("降级", 'degradeRow', () => $t.chgLevel(1));
    $t.regEvent("上移", 'shiftUpRow', () => $t.chgLevel(2));
    $t.regEvent("下移", 'shiftDownRow', () => $t.chgLevel(3));

    $t.setQueryParam = () => {
        // if ($t.serachForm) {
        //     let {validateFields} = $t.serachForm;
        //     validateFields((err,values) => {
        //         if (!err) {
        //             $t.getGrid().setGridParam({postData: values})
        //         }
        //     })
        // }
    };


    $t.register = form   => $t.serachForm = form;
};

export default ListComponent;