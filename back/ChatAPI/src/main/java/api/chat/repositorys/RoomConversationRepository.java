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

package api.chat.repositorys;

import api.chat.entities.RoomConversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
/**
 * @author Vinícius Eduardo dos Santos
 * @author Pedro Henrique Panstein
 */
public interface RoomConversationRepository extends JpaRepository<RoomConversation, Long> {
    List<RoomConversation> findByUsersIdContaining(Long userId);

    @Query("SELECT rc FROM RoomConversation rc WHERE :user1 MEMBER OF rc.usersId AND :user2 MEMBER OF rc.usersId AND SIZE(rc.usersId) = 2")
    Optional<RoomConversation> findRoomByTwoUsers(@Param("user1") Long user1, @Param("user2") Long user2);
}
