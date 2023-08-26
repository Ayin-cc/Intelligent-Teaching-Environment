package controller;


import entity.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import service.CourseSchedualeService;

import java.util.List;

@RestController
@RequestMapping("/CourseSchedule")
public class CourseScheduleController {
    @Autowired
    private CourseSchedualeService courseSchedualeService;

    // 获取课表接口
    @RequestMapping("/get")
    public void get(@RequestBody String type, String sid, List<Course> set){
        if(type.equals("schedule")){
            courseSchedualeService.get(sid);
        }
        else{
            System.out.println("请求信息错误！");
        }
    }

    // 修改课表接口
    @RequestMapping("/change")
    public void change(@RequestBody String type, List<Course> set){
        if(type.equals("schedule")){
            courseSchedualeService.change(set);
        }
        else{
            System.out.println("请求信息错误！");
        }
    }

}
