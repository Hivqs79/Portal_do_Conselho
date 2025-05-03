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

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import net.weg.general_api.model.entity.classes.Class;
import net.weg.general_api.model.entity.users.Student;
import net.weg.general_api.model.entity.users.Teacher;
import net.weg.general_api.model.entity.users.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TeacherRepository extends JpaRepository<Teacher, Long>, JpaSpecificationExecutor<Teacher> {

    default Page<Teacher> getAllByEnabledIsTrue(Specification<Teacher> spec, Pageable pageable) {
        Specification<Teacher> enabledSpec = Specification.where(spec)
                .and((root, query, cb) -> {
                    // Faz o join com UserAuthentication e verifica o campo enabled
                    Join<Teacher, User> userJoin = root.join("userAuthentication", JoinType.INNER);
                    return cb.isTrue(userJoin.get("enabled"));
                });

        return findAll(enabledSpec, pageable);
    }

    default Page<Teacher> findAllByClassIdAndSpec(Long classId, Specification<Teacher> spec, Pageable pageable) {
        Specification<Teacher> finalSpec = Specification.where(spec)
                .and((root, query, cb) -> {
                    // Join com a tabela de classes (ManyToMany)
                    Join<Teacher, Class> classJoin = root.join("classes");
                    // Filtra pelo ID da classe
                    return cb.equal(classJoin.get("id"), classId);
                })
                .and((root, query, cb) -> {
                    // Verifica se o usuário está ativo (enabled = true)
                    Join<Teacher, User> userJoin = root.join("userAuthentication", JoinType.INNER);
                    return cb.isTrue(userJoin.get("enabled"));
                });

        return findAll(finalSpec, pageable);
    }


}
