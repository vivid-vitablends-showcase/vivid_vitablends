Title:
[DevOps] Docker Resolver Caching Upstream IP Addresses Indefinitely

### Description
In `nginx/nginx.conf`, the configuration uses an `upstream` block to define `backend` and `frontend`. Nginx resolves hostnames defined in `upstream` blocks only once during startup. The file contains a `resolver 127.0.0.11 valid=30s;` directive, but it is not utilized properly because `proxy_pass http://backend;` does not use a variable.

### Location
`nginx/nginx.conf` (Lines 27-41)

```nginx
    upstream backend {
        server backend:5000;
        keepalive 32;
    }
```

### Why This Matters
If the backend or frontend Docker containers are restarted, Docker will assign them new internal IP addresses. Because Nginx caches the original IPs indefinitely, it will begin throwing 502 Bad Gateway errors until the Nginx container is manually restarted or reloaded, causing unnecessary downtime.

### Suggested Fix
Remove the `upstream` blocks and leverage variables in the `proxy_pass` directive to force Nginx to re-resolve the domain name using the Docker DNS resolver:

```nginx
        set $backend "http://backend:5000";
        proxy_pass $backend;
```

### Priority
High

### Labels
devops, reliability