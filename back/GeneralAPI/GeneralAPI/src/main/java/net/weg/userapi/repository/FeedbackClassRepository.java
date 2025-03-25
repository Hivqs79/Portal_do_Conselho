package net.weg.userapi.repository;

import net.weg.userapi.model.entity.classes.Class;
import net.weg.userapi.model.entity.feedback.FeedbackClass;
import net.weg.userapi.model.entity.feedback.FeedbackUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Collection;
import java.util.List;

public interface FeedbackClassRepository extends JpaRepository<FeedbackClass, Long>, JpaSpecificationExecutor<FeedbackClass> {

}

