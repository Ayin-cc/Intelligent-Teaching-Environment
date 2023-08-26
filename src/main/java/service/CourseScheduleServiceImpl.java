package service;

import dao.CourseScheduleDao;
import entity.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseScheduleServiceImpl implements CourseSchedualeService {
    @Autowired
    private CourseScheduleDao courseScheduleDao;

    @Override
    public void get(String sid){

    }

    @Override
    public void change(List<Course> set){

    }
}
