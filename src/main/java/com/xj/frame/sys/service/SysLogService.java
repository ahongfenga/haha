
package com.xj.frame.sys.service;


import java.util.Map;

import com.baomidou.mybatisplus.service.IService;
import com.xj.frame.common.utils.PageUtils;
import com.xj.frame.sys.entity.SysLogEntity;


/**
 * 系统日志
 * 
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2017-03-08 10:40:56
 */
public interface SysLogService extends IService<SysLogEntity> {

    PageUtils queryPage(Map<String, Object> params);

}
