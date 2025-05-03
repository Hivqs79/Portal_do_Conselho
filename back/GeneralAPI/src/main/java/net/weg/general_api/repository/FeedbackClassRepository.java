/*
 * Copyright 2025 Pedro Henrique Panstein, Pedro Augusto Wilhelm, Mateus Henrique Bosquetti, Kaua Eggert, Vinícius Eduardo dos Santos.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package net.weg.general_api.repository;

import net.weg.general_api.model.entity.feedback.FeedbackClass;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FeedbackClassRepository extends JpaRepository<FeedbackClass, Long>, JpaSpecificationExecutor<FeedbackClass> {

    boolean existsFeedbackClassByCouncil_Id(Long council_id);
    default Page<FeedbackClass> getAllByEnabledIsTrue(Specification<FeedbackClass> spec, Pageable pageable) {
        Specification<FeedbackClass> enabledSpec = Specification.where(spec)
                .and((root, query, cb) -> cb.isTrue(root.get("enabled")));

        return findAll(enabledSpec, pageable);
    }

    List<FeedbackClass> getFeedbackClassByCouncil_Id(Long councilId);

    @Query("SELECT fc FROM FeedbackClass fc " +
            "JOIN fc.council c " +
            "JOIN c.teachers t " +
            "WHERE t.id = :teacherId")
    Page<FeedbackClass> findAllByTeacherId(@Param("teacherId") Long teacherId, Pageable pageable);
}

