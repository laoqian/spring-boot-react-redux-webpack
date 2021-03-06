package muyu.system.web;

import muyu.system.common.beans.ResultBean;
import muyu.system.common.beans.ResultPageBean;
import muyu.system.common.beans.SubmitBatchBean;
import muyu.system.entity.Role;
import muyu.system.entity.RoleMenu;
import muyu.system.utils.UserUtils;
import muyu.system.entity.User;
import muyu.system.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("${prefixPath}/user/")
public class UserController extends BaseController{

    @Autowired
    UserService userService;

    @RequestMapping("getAuthedUser")
    ResultBean<User> getAuthedUser(User user){
        return new ResultBean<>(UserUtils.getUser());
    }

    @RequestMapping("get")
    ResultBean<User> get(User user){
        return userService.query(user);
    }

    @RequestMapping("save")
    ResultBean<User> save(@RequestBody User user){
        if(StringUtils.isNotBlank(user.getPassword())){
            user.setPassword(DigestUtils.md5DigestAsHex(user.getPassword().getBytes()));
        }

        return userService.save(user);
    }

    @RequestMapping("changePassword")
    ResultBean<String> changePassword(User user,String newPassword){
        return userService.changePassword(user,newPassword);
    }

    @RequestMapping("findUserMenuList")
    public ResultBean<List> findUserMenuList(String userId){
        return userService.findUserMenuList(userId);
    }

    @RequestMapping("findUserRoleList")
    public ResultBean<List> findUserRoleList(String userId){
        return userService.findUserRoleList(userId);
    }

    @RequestMapping("saveUserRoleBatch")
    public ResultBean<User> saveRoleMenuBatch(SubmitBatchBean<User,String> batchBean){
        return userService.saveRoleMenuBatch(batchBean);
    }

    @RequestMapping("delete")
    ResultBean<User> delete(User user){
        return userService.delete(user);
    }

    @RequestMapping("findPage")
    public ResultPageBean<User> findPage(User user, HttpServletRequest request){
        return userService.findPage(request,user);
    }

}
