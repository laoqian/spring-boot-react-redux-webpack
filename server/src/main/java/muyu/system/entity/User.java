
package muyu.system.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import muyu.system.common.persistence.DataEntity;
import muyu.system.validator.CLength;
import org.assertj.core.util.Lists;

import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017年9月20日
 * @version: 1.0.0
 */

@EqualsAndHashCode(callSuper = true)
@Data
public class User extends DataEntity<User> {
	private static final long serialVersionUID = 1L;

	private Office company;	// 归属公司		--1
	private Office office;	// 归属部门		--2

	@NotNull
	@CLength(min=2,max = 100,message = "用户名长度必须在2-100内")
	private String loginName;// 登录名

	@NotNull
	@CLength(min=3, max = 100, message = "密码长度2-100")
	private String password;// 密码

	private String no;		// 工号
	private String name;	// 姓名
	private String email;	// 邮箱
	private String phone;	// 电话
	private String mobile;	// 手机
	private String userType;	// 用户类型
	private String loginIp;	// 最后登陆IP
	private Date   loginDate;  // 最后登陆日期
	private String loginFlag;  // 是否允许登陆
	private String photo;	   // 头像

	private String oldLoginName;// 原登录名
	private String newPassword;	// 新密码
	
	private String oldLoginIp;		// 上次登陆IP
	private Date   oldLoginDate;		// 上次登陆日期
	private Integer authErrorNum; 	// 认证错误次数
	private Role role;	// 根据角色查询用户条件
	
	private List<Role> roleList = Lists.newArrayList(); // 拥有角色列表
	private List<Menu> menuList = Lists.newArrayList(); // 拥有角色列表

	public User(){
		super();
	}

	public User(String id){
		super(id);
	}
}