package service;

import dao.CourseScheduleDao;
import entity.Course;
import entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseScheduleServiceImpl implements CourseSchedualeService {
    @Autowired
    private CourseScheduleDao courseScheduleDao;

    @Override
    public List<Course> get(Student student){
        return courseScheduleDao.selectCourseBySid(student.getSid());
    }
}
