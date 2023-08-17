package serve;

import dao.CourseScheduleDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CourseScheduleServiceImpl implements CourseSchedualeService {
    @Autowired
    private CourseScheduleDao courseScheduleDao;

    @Override
    public void get(){

    }

    @Override
    public void change(){

    }

}
