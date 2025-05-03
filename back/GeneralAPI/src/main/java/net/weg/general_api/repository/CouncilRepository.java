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

import net.weg.general_api.model.entity.council.Council;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CouncilRepository extends JpaRepository<Council, Long>, JpaSpecificationExecutor<Council> {
    default Page<Council> getAllByEnabledIsTrue(Specification<Council> spec, Pageable pageable) {
        Specification<Council> enabledSpec = Specification.where(spec)
                .and((root, query, cb) -> cb.isTrue(root.get("enabled")))
                .and((root, query, cb) -> cb.isFalse(root.get("isFinished")));

        return findAll(enabledSpec, pageable);
    }

    boolean existsCouncilByisHappeningIsTrue();

}
