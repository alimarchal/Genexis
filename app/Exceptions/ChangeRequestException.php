<?php

namespace App\Exceptions;

use RuntimeException;

/**
 * A change request cannot be decided or applied. The message is safe to show to the checker.
 */
class ChangeRequestException extends RuntimeException {}
