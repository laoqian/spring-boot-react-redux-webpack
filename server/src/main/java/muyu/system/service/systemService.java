package muyu.system.service;

import muyu.system.common.beans.ResultBean;
import muyu.system.common.service.BaseService;
import muyu.system.common.tree.TreeNode;
import muyu.system.dao.DictDao;
import muyu.system.dao.GenDao;
import muyu.system.dao.MenuDao;
import muyu.system.dao.RoleDao;
import muyu.system.entity.Config;
import muyu.system.entity.Dict;
import muyu.system.entity.Role;
import muyu.system.entity.TableColumn;
import muyu.system.security.SecurityUser;
import muyu.system.utils.CacheUtils;
import muyu.system.utils.IdentifyCodeUtils;
import muyu.system.utils.UserUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;


/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/10/20
 * @version: 1.0.0
 */

@Service
@Transactional
public class SystemService extends BaseService{

    @Autowired
    DictDao dictDao;

    @Autowired
    MenuDao menuDao;

    @Autowired
    RoleDao roleDao;

    @Autowired
    GenDao genDao;

    public ResultBean<Config> getConfig(){
        Config config=  new Config();
        String rootId = "0";

        SecurityUser user  = (SecurityUser)UserUtils.getUser();

        if(user!=null){
            config.setMenuList(rootId,menuDao.findTree(rootId));
            config.setRoleList(roleDao.findList(new Role()));
            config.setDicts(dictDao.findList(new Dict()));
            config.setTableColumns(genDao.findTableColumn(new TableColumn()));
        }

        return new ResultBean<>(config);
    }

    /**
     * 获取验证码
     * @return
     */
    public ResultBean getCachedCode(HttpServletRequest request) throws IOException {
        Map varify = IdentifyCodeUtils.getCode(true);
        CacheUtils.set(request.getRemoteAddr(),"code",varify.get("code"));
        return new ResultBean(varify.get("image"));
    }
}
