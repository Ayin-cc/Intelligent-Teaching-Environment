package controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import serve.CourseSchedualeService;

@RestController
@RequestMapping("/CourseSchedule")
public class CourseScheduleController {
    @Autowired
    private CourseSchedualeService courseSchedualeService;

    // 获取课表接口
    @RequestMapping("/get")
    public void get(){

    }

    // 修改课表接口
    @RequestMapping("/change")
    public void change(){

    }

}
