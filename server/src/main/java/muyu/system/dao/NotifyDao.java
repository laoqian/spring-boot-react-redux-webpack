package muyu.system.dao;

import muyu.system.common.persistence.CrudDao;
import muyu.system.entity.Notify;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Component;


/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2018/1/11
 * @version: 1.0.0
 */
@Component
public interface NotifyDao extends CrudDao<Notify>{

    @Update("update sys_notify set browse_volume=nvl(browse_volume,0)+1 where id = #{id}")
    void browseVolumeIncrease(Notify notify);
}
