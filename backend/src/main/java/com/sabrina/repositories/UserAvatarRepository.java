// src/main/java/com/sabrina/repositories/UserAvatarRepository.java
package com.sabrina.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sabrina.entities.UserAvatar;
import java.util.Optional;

public interface UserAvatarRepository extends JpaRepository<UserAvatar, Long> {
    Optional<UserAvatar> findByUserId(Long userId);
}
