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

import net.weg.general_api.model.entity.feedback.FeedbackStudent;
import net.weg.general_api.model.entity.feedback.FeedbackUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FeedbackUserRepository extends JpaRepository<FeedbackUser, Long>, JpaSpecificationExecutor<FeedbackUser> {

    boolean existsFeedbackUserByPreCouncil_IdAndUser_Id(Long pre_council_id, Long user_id);

    default Page<FeedbackUser> getAllByEnabledIsTrue(Specification<FeedbackUser> spec, Pageable pageable) {
        Specification<FeedbackUser> enabledSpec = Specification.where(spec)
                .and((root, query, cb) -> cb.isTrue(root.get("enabled")));

        return findAll(enabledSpec, pageable);
    }

    default Page<FeedbackUser> getAllByEnabledIsTrueAndUserId(Specification<FeedbackUser> spec, Pageable pageable, Long userId) {
        Specification<FeedbackUser> enabledSpec = Specification.where(spec)
                .and((root, query, cb) -> cb.isTrue(root.get("enabled")))
                .and((root, query, cb) -> cb.equal(root.get("user").get("id"), userId));

        return findAll(enabledSpec, pageable);
    }
}
