package ecommerce.ecommerce.domain.user;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Authority {

    @Id
    @Column(name = "name", length = 20)
    private String name;
}
