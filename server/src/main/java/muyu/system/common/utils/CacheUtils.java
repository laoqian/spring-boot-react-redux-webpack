package muyu.system.common.utils;

import muyu.system.entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.cache.RedisCacheManager;



/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/10/20
 * @version: 1.0.0
 */

public class CacheUtils {
	
	private static Logger logger = LoggerFactory.getLogger(CacheUtils.class);

	private static final String SYS_CACHE = "sysCache";
	public static final String CACHE_ROLE_LIST = "roleList";
	public static final String CACHE_MENU_LIST = "menuList";
	public static final String CACHE_AREA_LIST = "areaList";
	public static final String CACHE_OFFICE_LIST = "officeList";
	public static final String CACHE_OFFICE_ALL_LIST = "officeAllList";

	public static final String USER_CACHE = "userCache";
	public static final String USER_CACHE_ID_ = "id_";

	private static RedisCacheManager redisCacheManager = ContextUtils.getBean(RedisCacheManager.class);


	public static void put(String cacheName,String key,Object value){
		redisCacheManager.getCache(cacheName).put(key,value);
	}

	public static Object get(String cacheName,String key){
		return redisCacheManager.getCache(cacheName).get(key);
	}

	public static void remove(String cacheName,String key){
		redisCacheManager.getCache(cacheName).evict(key);
	}

	public static void clear(String cacheName){
		redisCacheManager.getCache(cacheName).clear();
	}

	public static void putGlobalCache(String key,Object value){
		put(SYS_CACHE,key,value);
	}

	public static Object getGlobalCache(String key){
		return get(SYS_CACHE,key);
	}

	public static void putUserCache(String key,Object value){
		put(USER_CACHE,getUserKey(key),value);
	}

	public static Object getUserCache(String key){
		return get(USER_CACHE,getUserKey(key));
	}

	private static String getUserKey(String key){
		return USER_CACHE_ID_ + UserUtils.getUser().getId() + "_" + key;
	}
}
