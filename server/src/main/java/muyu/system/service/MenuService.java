package muyu.system.service;

import muyu.system.common.beans.ResultBean;
import muyu.system.common.beans.SubmitBatchBean;
import muyu.system.common.service.TreeService;
import muyu.system.dao.MenuDao;
import muyu.system.entity.Menu;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/9/15
 * @version: 1.0.0
 */

@Service
@Transactional
public class MenuService extends TreeService<MenuDao,Menu> {


    public ResultBean<Menu> saveBatch(SubmitBatchBean<?,Menu> batchBean){
        List<Menu> list = batchBean.getList();
        genId(list).forEach(this::save);
        return  new ResultBean<>("保存菜单成功",true);
    }
}
