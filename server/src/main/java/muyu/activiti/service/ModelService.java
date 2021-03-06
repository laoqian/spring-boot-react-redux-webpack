package muyu.activiti.service;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import muyu.activiti.dao.ActDao;
import muyu.system.common.beans.ResultBean;
import muyu.system.common.beans.ResultPageBean;
import muyu.system.common.service.BaseService;
import org.activiti.bpmn.converter.BpmnXMLConverter;
import org.activiti.bpmn.model.BpmnModel;
import org.activiti.editor.constants.ModelDataJsonConstants;
import org.activiti.editor.language.json.converter.BpmnJsonConverter;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.impl.persistence.entity.ModelEntity;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.Model;
import org.activiti.engine.repository.ProcessDefinition;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.List;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2018/1/14
 * @version: 1.0.0
 */
@Service
public class ModelService extends BaseService{

    @Autowired
    RepositoryService repositoryService;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    ActDao actDao;

    public ResultBean<Model> create(String name, String key, String description, String category) throws UnsupportedEncodingException {
        ObjectNode editorNode = objectMapper.createObjectNode();
        editorNode.put("id", "canvas");
        editorNode.put("resourceId", "canvas");
        ObjectNode properties = objectMapper.createObjectNode();
        properties.put("process_author", "deeevilyu");
        editorNode.set("properties", properties);
        ObjectNode stencilset = objectMapper.createObjectNode();
        stencilset.put("namespace", "http://b3mn.org/stencilset/bpmn2.0#");
        editorNode.set("stencilset", stencilset);

        Model model = repositoryService.newModel();
        model.setKey(StringUtils.defaultString(key));
        model.setName(name);
        model.setCategory(category);
        model.setVersion(Integer.parseInt(String.valueOf(repositoryService.createModelQuery().modelKey(model.getKey()).count()+1)));

        ObjectNode modelObjectNode = objectMapper.createObjectNode();
        modelObjectNode.put(ModelDataJsonConstants.MODEL_NAME, name);
        modelObjectNode.put(ModelDataJsonConstants.MODEL_REVISION, model.getVersion());
        modelObjectNode.put(ModelDataJsonConstants.MODEL_DESCRIPTION,StringUtils.defaultString(description));
        model.setMetaInfo(modelObjectNode.toString());

        repositoryService.saveModel(model);
        repositoryService.addModelEditorSource(model.getId(),editorNode.toString().getBytes("utf-8"));

        return new ResultBean<>(model);
    }

    public ResultBean deploy(String id) throws Exception {

        //获取模型
        Model modelData = repositoryService.getModel(id);
        byte[] bytes = repositoryService.getModelEditorSource(modelData.getId());

        if (bytes == null) {
            return new ResultBean("模型数据为空，请先设计流程并成功保存，再进行发布。",false);
        }

        JsonNode modelNode = new ObjectMapper().readTree(bytes);

        BpmnModel model = new BpmnJsonConverter().convertToBpmnModel(modelNode);
        if(model.getProcesses().size()==0){
            return new ResultBean("数据模型不符要求，请至少设计一条主线流程。",false);
        }
        byte[] bpmnBytes = new BpmnXMLConverter().convertToXML(model);

        //发布流程
        String processName = modelData.getName() + ".bpmn20.xml";
        Deployment deployment = repositoryService.createDeployment()
                .name(modelData.getName())
                .category(modelData.getCategory())
                .addString(processName, new String(bpmnBytes, "UTF-8"))
                .deploy();
        modelData.setDeploymentId(deployment.getId());
        repositoryService.saveModel(modelData);

        return new ResultBean("发布成功",true);
    }

    public ResultBean<Model> get(Model model) {
        return  new ResultBean<>((repositoryService.createModelQuery().modelId(model.getId()).singleResult()));
    }

    public ResultPageBean<Model> findPage(HttpServletRequest request) {
        ResultPageBean<Model> bean = new ResultPageBean<>(request);
        List<Model> list = repositoryService.createModelQuery().listPage( bean.getPageSize()*(bean.getPageNum()-1),bean.getPageSize());
        bean.setList(list);
        return bean;
    }

    public ResultBean<Model> delete(Model model){
        repositoryService.deleteModel(model.getId());
        return new ResultBean<>("删除模型成功",true);
    }


    public void upgrade(ProcessDefinition procDef){
        actDao.updateRunTasks(procDef.getId(),procDef.getKey(),procDef.getVersion());
        actDao.updateExecutes(procDef.getId(),procDef.getKey(),procDef.getVersion());
        actDao.updateJobs(procDef.getId(),procDef.getKey(),procDef.getVersion());
        actDao.updateIdentitylinks(procDef.getId(),procDef.getKey(),procDef.getVersion());
        actDao.updateTaskinsts(procDef.getId(),procDef.getKey(),procDef.getVersion());
        actDao.updateProcinsts(procDef.getId(),procDef.getKey(),procDef.getVersion());
        actDao.updateActinsts(procDef.getId(),procDef.getKey(),procDef.getVersion());
    }
}
