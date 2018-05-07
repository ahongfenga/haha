
package com.xj.frame.sys.service;

import java.util.Map;

import com.baomidou.mybatisplus.service.IService;
import com.xj.frame.common.utils.PageUtils;
import com.xj.frame.sys.entity.SysDictEntity;

/**
 * 数据字典
 *
 * @author Mark sunlightcs@gmail.com
 * @since 3.1.0 2018-01-27
 */
public interface SysDictService extends IService<SysDictEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

